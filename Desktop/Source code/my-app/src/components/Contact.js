import React, { useState } from 'react';
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Phone, Mail, Clock, MapPin, Send, Facebook, Twitter, Linkedin, Instagram, CheckCircle2, XCircle,  } from 'lucide-react'
import { Alert, AlertDescription } from "./ui/alert"
import { useToast } from "./ui/use-toast"
import './Styles/Contact.css'; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const ContactPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
      });
      return false;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Email không hợp lệ",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Implement EmailJS
    try {
      const templateParams = {
        to_email: 'lysulong246@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      };

      // Replace with your EmailJS service ID, template ID, and user ID
      /* 
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_USER_ID'
      );
      */

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Thành công!",
        description: "Tin nhắn của bạn đã được gửi thành công",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      {/* Modern Particles Background */}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header Section with Parallax Effect */}
      <div className="relative w-full bg-white/80 backdrop-blur-sm shadow-lg py-12">
        <div className="container mx-auto px-4">
        <div className="container mx-auto flex items-center justify-between -mt-2">
  <motion.div 
    className="text-xl font-bold text-purple-800 italic"
    whileHover={{ scale: 1.1 }}
  >
    <Link to="/">OceanVie</Link>
  </motion.div>
  </div>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 animate-fade-in">
            
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-gray-600 mt-4 text-lg animate-slide-up">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information with Hover Effects */}
          <div className="space-y-6">
            <Card className="border-purple-200 hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/80">
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 group">
                    <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                      <MapPin className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="font-medium text-gray-900">Địa Chỉ</h3>
                      <p className="text-gray-600">123 Đường ABC, Quận XYZ, TP.HCM</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group">
                    <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                      <Phone className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="font-medium text-gray-900">Điện Thoại</h3>
                      <p className="text-gray-600">0123.456.789</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group">
                    <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                      <Mail className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">contact@company.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group">
                    <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                      <Clock className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="font-medium text-gray-900">Giờ làm việc</h3>
                      <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-8 flex space-x-4 justify-center">
                  <a href="#" className="p-3 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors duration-300">
                    <Facebook className="w-5 h-5 text-purple-600" />
                  </a>
                  <a href="#" className="p-3 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors duration-300">
                    <Twitter className="w-5 h-5 text-purple-600" />
                  </a>
                  <a href="#" className="p-3 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors duration-300">
                    <Linkedin className="w-5 h-5 text-purple-600" />
                  </a>
                  <a href="#" className="p-3 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors duration-300">
                    <Instagram className="w-5 h-5 text-purple-600" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map */}
            <Card className="border-purple-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <CardContent className="p-0">
                <div className="aspect-video bg-purple-50 relative overflow-hidden">
                  <img 
                    src="/images/qlkho_2.jpg" 
                    alt="Map" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Contact Form with Animations */}
          <Card className="border-purple-200 hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/80">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-purple-700">Họ và tên *</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên của bạn"
                    className="border-purple-200 focus:border-purple-400 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-purple-700">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="border-purple-200 focus:border-purple-400 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-purple-700">Số điện thoại *</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại của bạn"
                    className="border-purple-200 focus:border-purple-400 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-purple-700">Chủ đề</Label>
                  <Input 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Nhập chủ đề liên hệ"
                    className="border-purple-200 focus:border-purple-400 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-purple-700">Nội dung tin nhắn *</Label>
                  <Textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Nhập nội dung tin nhắn của bạn"
                    className="border-purple-200 focus:border-purple-400 transition-all duration-300 min-h-32"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className={`w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang gửi...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Gửi tin nhắn
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced FAQ Section with Animations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
          {[
              {
                question: "Làm thế nào để tôi có thể theo dõi đơn hàng?",
                answer: "Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản và vào mục 'Đơn hàng của tôi'. Tại đây bạn sẽ thấy trạng thái chi tiết của từng đơn hàng."
              },
              {
                question: "Chính sách bảo hành của các sản phẩm như thế nào?",
                answer: "Chúng tôi cung cấp bảo hành 12 tháng cho tất cả các sản phẩm chính hãng. Quy trình bảo hành nhanh chóng và miễn phí trong thời gian bảo hành."
              },
              {
                question: "Thời gian giao hàng mất bao lâu?",
                answer: "Thời gian giao hàng thường từ 2-5 ngày làm việc tùy khu vực. Với đơn hàng nội thành, chúng tôi có thể giao trong ngày."
              },
              {
                question: "Làm sao để trở thành đại lý của công ty?",
                answer: "Để trở thành đại lý, bạn cần đáp ứng một số tiêu chí về vốn và địa điểm kinh doanh. Vui lòng liên hệ với chúng tôi để được tư vấn chi tiết."
              }
            ].map((faq, index) => (
              <Card 
                key={index} 
                className="border-purple-200 hover:shadow-xl transition-all duration-300 group backdrop-blur-sm bg-white/80"
              >
                <CardContent className="pt-6">
                  <h3 className="font-medium text-purple-800 text-lg mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Khách Hàng", value: "1000+", icon: "👥" },
              { label: "Đại Lý", value: "50+", icon: "🏢" },
              { label: "Sản Phẩm", value: "500+", icon: "📦" },
              { label: "Năm Kinh Nghiệm", value: "10+", icon: "⭐" }
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="border-purple-200 hover:shadow-xl transition-all duration-300 group backdrop-blur-sm bg-white/80"
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-purple-800 mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16">
          <Card className="border-purple-200 hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/80">
            <CardContent className="py-8">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  Đăng ký nhận tin
                </h3>
                <p className="text-gray-600 mb-6">
                  Nhận thông tin mới nhất về sản phẩm và khuyến mãi
                </p>
                <div className="flex gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Nhập email của bạn"
                    className="border-purple-200 focus:border-purple-400"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300">
                    Đăng ký
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Chat Button
        <button className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 group">
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"></div>
          <Send className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button> */}
      </div>

      
    </div>
  );
};

export default ContactPage;