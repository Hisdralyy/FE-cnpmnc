import React, { useState, useEffect } from 'react';
import { User, History, Settings, LogOut, Bell, ShoppingBag, Search, Filter, Calendar as CalendarIcon , 
  Camera, Mail, Phone, MapPin, Briefcase, Calendar, Award, Edit2,Building2 ,Facebook, Twitter, LinkedIn
} from 'lucide-react';
import {
  CardFooter,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// OrderHistory Component

const ProfileIcon = () => { 
  const navigate = useNavigate();//điều hướng 
  const handleLogout = () => {//hàm đăng xuất 
    // Xóa token từ localStorage
    localStorage.removeItem("token")

    // Có thể xóa thêm các thông tin khác nếu cần
    //localStorage.clear() // Nếu muốn xóa tất cả dữ liệu

    // Chuyển hướng về trang đăng nhập
    navigate("/login")

    // Reload lại trang sau khi chuyển hướng
    window.location.reload()

  }
  const [open, setOpen] = useState(false);//hàm mở Dropmenu
  const [isAuthenticated, setIsAuthenticated] = useState(false);//theo dõi trạng thái đăng nhập
  useEffect(() => {
    // Kiểm tra token trong localStorage khi component mount
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    // Thêm event listener để kiểm tra thay đổi trong localStorage
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
 // Nếu chưa đăng nhập, hiển thị nút đăng nhập
 if (!isAuthenticated) {
  return (
    <Button
      variant="ghost"
      className="text-purple-800 hover:bg-purple-100 hover:text-purple-900"
      onClick={() => navigate("/login")}
    >
      Đăng nhập
    </Button>
  );
}


  return (

    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full "
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src="images/user.png" alt="Profile" className="h-7 w-7" />
            <AvatarFallback>X</AvatarFallback>
          </Avatar>
          <Badge className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500" />
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-md border border-purple-200 bg-white shadow-md"
        align="end"
      >
        <DropdownMenuLabel className="text-purple-800">Tài khoản của tôi</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-purple-200" />
        <DropdownMenuItem
          className="text-purple-800 hover:bg-purple-100 hover:text-purple-900"
          onClick={() => navigate('profile')}
        >
          <User className="mr-2 h-4 w-4 text-purple-800" />
          Trang cá nhân
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-purple-800 hover:bg-purple-100 hover:text-purple-900"
          onClick={() => navigate('OrderHistory')}
        >
          <History className="mr-2 h-4 w-4 text-purple-800" />
          Lịch sử đơn hàng
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border-purple-200" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-purple-800 hover:bg-purple-100 hover:text-purple-900"
        >
          <LogOut className="mr-2 h-4 w-4 text-purple-800" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};



const ProfilePage = () => { // Trang cá nhân của khách hàng
  
  
  const [localAgency, setLocalAgency] = useState(null);
  const [editedAgency, setEditedAgency] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const useAgencyData = () => { //để lưu dữ liệu và trạng thái tải, useEffect để gọi API khi agencyId thay đổi.
    const [agency, setAgency] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchAgencyData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch('http://localhost:5018/api/Agency/get-all'); // Thay đổi URL API theo endpoint của bạn
          const result = await response.json();
          if (result.data) {
            setLocalAgency(result.data[0]); // Lấy agency đầu tiên từ mảng data
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchAgencyData();
    }, []);
  
    return { agency, isLoading, error };
  };

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedAgency = localStorage.getItem('agencyProfile');
    if (savedAgency) {
      const parsedAgency = JSON.parse(savedAgency);
      setLocalAgency(parsedAgency);
    }
  }, []);

  // Render individual info row
  const renderInfoRow = (Icon, label, value, colorClass = '') => (
    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
      <Icon className="w-5 h-5 text-purple-600" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`font-medium text-gray-900 ${colorClass}`}>{value || '---'}</p>
      </div>
    </div>
  );
   // Tính toán thời gian hoạt động
   const getActivityDuration = () => {
    if (!localAgency?.createdOn) return '0 ngày';
    const created = new Date(localAgency.createdOn);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ngày`;
  };
  // Handle input changes in update dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAgency(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save updated information to localStorage
  const handleUpdateProfile = () => {
    const updatedAgency = {
      ...localAgency,
      ...editedAgency
    };

    // Save to localStorage
    localStorage.setItem('agencyProfile', JSON.stringify(updatedAgency));
    
    // Update local state
    setLocalAgency(updatedAgency);
    
    // Close dialog
    setIsDialogOpen(false);
  };
  // const renderInfoRow = (label, value, additionalClasses = '') => (
  //   <div className="flex justify-between items-center bg-white/80 p-3 rounded-xl shadow-sm transition-all duration-300 hover:bg-purple-50/50 hover:shadow-md">
  //     <span className="text-gray-600 font-light text-sm">{label}:</span>
  //     <span className={`font-semibold text-sm text-black/80 ${additionalClasses}`}>
  //       {value}
  //     </span>
  //   </div>
  // );
  const navigate = useNavigate();
  const handleBackToProducts = () => {
    navigate('/product');
  };
  const { agency, isLoading, error } = useAgencyData();
  

  if (isLoading) {
    return (
      <Card className="md:col-span-1">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="md:col-span-1">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">Có lỗi xảy ra: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="bg-white/95 shadow-xl border border-purple-200 overflow-hidden transition-all duration-300 hover:shadow-purple-100">
        {/* Header Section */}
        <CardHeader className="relative bg-gradient-to-r from-purple-100 via-white to-purple-100 p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
                <AvatarImage 
                  src="/images/person1.jpg" 
                  alt="Avatar" 
                  className="object-cover"
                />
                <AvatarFallback className="bg-purple-200 text-purple-800 text-2xl">
                  {localAgency?.name?.[0] || 'A'}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{localAgency?.name}</h2>
              <p className="text-gray-600">{localAgency?.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                  Đại lý chính thức
                </Badge>
                <Badge className="bg-green-100 text-green-800 px-3 py-1">
                  Đang hoạt động
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-purple-50/50">
          <div className="text-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-purple-600">{getActivityDuration()}</p>
            <p className="text-sm text-gray-600">Thời gian hoạt động</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-purple-600">100%</p>
            <p className="text-sm text-gray-600">Tỉ lệ phản hồi</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-purple-600">5.0</p>
            <p className="text-sm text-gray-600">Đánh giá</p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="info" className="p-6">
          <TabsList className="grid grid-cols-2 gap-4 bg-purple-50 p-1 rounded-lg">
            <TabsTrigger value="info" className="data-[state=active]:bg-white">
              Thông tin đại lý
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-white">
              Thông tin liên hệ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInfoRow(Building2, "Tên đại lý", localAgency?.name)}
              {renderInfoRow(Mail, "Email", localAgency?.email)}
              {renderInfoRow(MapPin, "Địa chỉ", localAgency?.address)}
              {renderInfoRow(Calendar, "Ngày tạo", 
                new Date(localAgency?.createdOn).toLocaleDateString('vi-VN')
              )}
              {renderInfoRow(Award, "Trạng thái", "Đang hoạt động", 'text-green-600')}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInfoRow(Phone, "Số điện thoại", localAgency?.phoneNumber)}
              {renderInfoRow(Mail, "Email liên hệ", localAgency?.email)}
              {renderInfoRow(Building2, "Người liên hệ", localAgency?.contactPerson)}
              {renderInfoRow(MapPin, "Địa chỉ liên hệ", localAgency?.address)}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <CardFooter className="bg-gray-50 p-6">
          <div className="w-full flex space-x-4">
            <Button 
              onClick={handleBackToProducts}
              className="w-1/2 bg-purple-600 text-white hover:bg-purple-700 rounded-xl shadow-md transition-colors duration-300"
            >
              Trở về trang sản phẩm
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="w-1/2 bg-green-600 text-white hover:bg-green-700 rounded-xl shadow-md transition-colors duration-300"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Cập nhật thông tin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-white italic">Cập Nhật Thông Tin Đại Lý</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-white">
                  <div>
                    <Label>Tên đại lý</Label>
                    <Input 
                      name="name"
                      defaultValue={localAgency?.name}
                      onChange={handleInputChange}
                      placeholder="Nhập tên đại lý"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input 
                      name="email"
                      defaultValue={localAgency?.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email"
                    />
                  </div>
                  <div>
                    <Label>Số điện thoại</Label>
                    <Input 
                      name="phoneNumber"
                      defaultValue={localAgency?.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <Label>Địa chỉ</Label>
                    <Input 
                      name="address"
                      defaultValue={localAgency?.address}
                      onChange={handleInputChange}
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                  <div>
                    <Label>Người liên hệ</Label>
                    <Input 
                      name="contactPerson"
                      defaultValue={localAgency?.contactPerson}
                      onChange={handleInputChange}
                      placeholder="Nhập người liên hệ"
                    />
                  </div>
                  <Button 
                    onClick={handleUpdateProfile}
                    className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-xl"
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};



export { ProfileIcon, ProfilePage };
