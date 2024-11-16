import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CalendarIcon, PackageIcon, CreditCardIcon, Loader2,Search} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

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

  return (
    <div className="container mx-auto p-4">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Lịch sử đơn hàng</h1>
      <Button variant="primary" onClick={handleBackToProducts}>
        Trở về trang sản phẩm
      </Button>
    </div>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="w-full">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-lg">
                Đơn hàng #{order.invoiceId}
              </CardTitle>
              <Badge className={`${getOrderStatus(order.status).color} text-white`}>
                {getOrderStatus(order.status).label}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-sm text-gray-600">Ngày đặt: {formatDate(order.createdOn)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PackageIcon className="h-4 w-4" />
                    <span className="text-sm text-gray-600">Đại lý: {order.agencyName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCardIcon className="h-4 w-4" />
                    <span className="text-sm font-semibold">Tổng tiền: {formatCurrency(order.amount)}</span>
                  </div>
                </div>
                
                <div className="border-t md:border-l md:border-t-0 md:pl-4 pt-4 md:pt-0">
                  <h3 className="font-semibold mb-2">Chi tiết sản phẩm</h3>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-2">
                      <img 
                        src={item.photo || "/api/placeholder/100/100"}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600">
                          Số lượng: {item.quantity} x {formatCurrency(item.unitPrice)}
                        </p>
                        <p className="text-sm font-semibold">
                          Thành tiền: {formatCurrency(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;