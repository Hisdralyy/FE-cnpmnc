import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CalendarIcon, PackageIcon, CreditCardIcon, TruckIcon, MapPinIcon,Loader2,Search} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
// Hàm chuyển đổi trạng thái đơn hàng
const getOrderStatus = (status) => {
  switch (status) {
    case 0:
      return { label: 'Chờ xác nhận', color: 'bg-yellow-500' };
    case 1:
      return { label: 'Đã xác nhận', color: 'bg-blue-500' };
    case 2:
      return { label: 'Đang giao hàng', color: 'bg-purple-500' };
    case 3:
      return { label: 'Hoàn thành', color: 'bg-green-500' };
    case 4:
      return { label: 'Đã hủy', color: 'bg-red-500' };
    default:
      return { label: 'Không xác định', color: 'bg-gray-500' };
  }
  // const statusStyles = {
  //   'pending': 'bg-yellow-500',
  //   'processing': 'bg-blue-500',
  //   'completed': 'bg-green-500',
  //   'cancelled': 'bg-red-500',
  //   'default': 'bg-gray-500'
  // };
  // return statusStyles[status.toLowerCase()] || statusStyles.default;
};

// Hàm format tiền tệ
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

// Hàm format ngày tháng
const formatDate = (dateString) => {
  if (!dateString) return '--/--/----';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
// Hàm random trạng thái (0 đến 4)
const randomStatus = () => {
    return Math.floor(Math.random() * 5); // Trả về một số ngẫu nhiên từ 0 đến 4
  };
  
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5018/api/Order/history/1?page=${currentPage}&pageSize=${pageSize}&search=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu đơn hàng');
        }
        const data = await response.json();
        // Gán trạng thái random cho từng đơn hàng nếu không có trạng thái
        const updatedOrders = data.map((order) => ({
            ...order,
            status: randomStatus(), // Gán trạng thái ngẫu nhiên
          }));
  
          // Gán trạng thái và màu sắc cho từng đơn hàng
          const finalOrders = updatedOrders.map((order) => ({
            ...order,
            statusInfo: getOrderStatus(order.status), // Gán thông tin trạng thái
          }));

        setOrders(finalOrders);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const handleBackToProducts = () => {
    navigate('/product');
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p className="text-lg font-semibold">Đã có lỗi xảy ra</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Không có đơn hàng nào trong lịch sử</p>
      </div>
    );
  }
// Group orders by year
const ordersByYear = orders.reduce((acc, order) => {
  const year = new Date(order.createdOn).getFullYear();
  if (!acc[year]) acc[year] = [];
  acc[year].push(order);
  return acc;
}, {});
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
              Lịch sử đơn hàng
            </h1>
            <p className="text-gray-600 mt-2">Xem lại các đơn hàng của bạn</p>
          </div>
          <Button 
            onClick={handleBackToProducts}
            className="mt-4 md:mt-0 bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 rounded-full px-6 py-2 shadow-sm transition-all duration-300"
          >
            Trở về trang sản phẩm
          </Button>
        </div>

        <Tabs defaultValue={String(new Date().getFullYear())} className="w-full">
          <TabsList className="mb-6 bg-white p-1 rounded-lg shadow-sm">
            {Object.keys(ordersByYear).map((year) => (
              <TabsTrigger
                key={year}
                value={year}
                className="px-6 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                {year}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(ordersByYear).map(([year, yearOrders]) => (
            <TabsContent key={year} value={year} className="space-y-6">
              {yearOrders.map((order) => (
                <Card 
                  key={order.id}
                  className="w-full hover:shadow-lg transition-shadow duration-300 bg-white border-0 shadow-sm overflow-hidden"
                >
                  <CardHeader className="flex flex-row justify-between items-center bg-gradient-to-r from-purple-50 to-white p-6">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-xl font-bold">
                        Đơn hàng #{order.invoiceId}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm">{formatDate(order.createdOn)}</span>
                      </div>
                    </div>
                    <Badge className={`${getOrderStatus(order.status)} text-white px-4 py-1 rounded-full`}>
                      {getOrderStatus(order.status).label}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <PackageIcon className="h-5 w-5 text-purple-600" />
                            <span className="text-gray-700">Đại lý: {order.agencyName}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPinIcon className="h-5 w-5 text-purple-600" />
                            <span className="text-gray-700">Địa chỉ : 123 Street A, City X</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CreditCardIcon className="h-5 w-5 text-purple-600" />
                            <span className="text-lg font-semibold text-purple-700">
                              {formatCurrency(order.amount)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <h3 className="font-semibold text-gray-900 mb-4">Chi tiết sản phẩm</h3>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div 
                              key={item.id}
                              className="flex gap-4 p-4 rounded-lg hover:bg-purple-50 transition-colors duration-300"
                            >
                              <img 
                                src={item.photo || "/api/placeholder/120/120"}
                                alt={item.productName}
                                className="w-24 h-24 object-cover rounded-lg shadow-sm"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{item.productName}</h4>
                                <div className="mt-2 space-y-1">
                                  <p className="text-sm text-gray-600">
                                    Số lượng: {item.quantity} x {formatCurrency(item.unitPrice)}
                                  </p>
                                  <p className="text-sm font-semibold text-purple-700">
                                    Thành tiền: {formatCurrency(item.unitPrice * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default OrderHistory;