import React, { useState, useEffect } from 'react';
import { User, History, Settings, LogOut, Bell, ShoppingBag, Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
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
          setAgency(result.data[0]); // Lấy agency đầu tiên từ mảng data
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
const ProfilePage = () => { // Trang cá nhân của khách hàng 
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

    <Card className="md:col-span-1 bg-purple-100">
      <CardHeader>
        <CardTitle className="text-purple-800">Thông tin đại lý</CardTitle>
        <CardDescription className="text-gray-600">Chi tiết tài khoản đại lý</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24 border-2 border-purple-500">
            <AvatarImage src="/images/person1.jpg" alt="Avatar" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Button variant="primary" onClick={handleBackToProducts}>
            Trở về trang sản phẩm
          </Button>



          <div className="w-full space-y-2">
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-500">Tên đại lý:</span>
              <span className="font-medium text-purple-800">{agency?.name}</span>
            </div>
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium text-purple-800">{agency?.email}</span>
            </div>
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-500">Số điện thoại:</span>
              <span className="font-medium text-purple-800">{agency?.phoneNumber}</span>
            </div>
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-500">Địa chỉ:</span>
              <span className="font-medium text-purple-800">{agency?.address}</span>
            </div>
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-500">Người liên hệ:</span>
              <span className="font-medium text-purple-800">{agency?.contactPerson}</span>
            </div>
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-500">Ngày tạo:</span>
              <span className="font-medium text-purple-800">
                {new Date(agency?.createdOn).toLocaleDateString('vi-VN')}
              </span>
            </div>
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-500">Trạng thái:</span>
              <span className={`font-medium ${agency?.discontinued ? 'text-red-500' : 'text-green-500'}`}>
                {agency?.discontinued ? 'Ngừng hoạt động' : 'Đang hoạt động'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};



export { ProfileIcon, ProfilePage };
