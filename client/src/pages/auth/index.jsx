import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../utils/constant";
import {useNavigate} from 'react-router-dom'
import { userAppStore } from "../../store";

const Auth = () => {
  const navigate = useNavigate();
  const {setUserInfo} = userAppStore;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
  return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm password should be same");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
          if(response.data.user.id){
            setUserInfo(response.data.user);
          }
         if (response.status === 200 || response.status === 201) {
           toast.success("Access successful ️🎉");
           console.log("Login successful:", response.data);
           // Thực hiện các hành động khác khi đăng ký thành công
           if(response.data.user.id){
            if(response.data.user.profileSetup) navigate("/chat");
            else navigate("/profile");
           }
         } else {
           toast.error("Login unsuccessful");
           console.error("Unexpected status code:", response.status);
           // Xử lý trường hợp khi mã trạng thái không phải là 200 hoặc 201
         }
      } catch (error) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        // Xử lý lỗi tùy thuộc vào mã trạng thái
        if (error.response.status === 400) {
          toast.error("Something went wrong");
          console.error("Bad Request: Invalid data submitted.");
        } else if (error.response.status === 401) {
          toast.error("Something went wrong");
          console.error("Unauthorized: Invalid credentials.");
        } else if (error.response.status === 500) {
          toast.error("Something went wrong");
          console.error("Server Error: Please try again later.");
        }
      }
    }
  };
  const handleSignup = async () => {
    if (validateSignup()) {
      try {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        // Kiểm tra nếu yêu cầu thành công
        if (response.status === 200 || response.status === 201) {
          setUserInfo(response.data.user);
          toast.success("Registration successful ️🎉");
          console.log("Signup successful:", response.data);
          // Thực hiện các hành động khác khi đăng ký thành công
          navigate("/profile");
        } else {
          toast.error("Signup unsuccessful");
          console.error("Unexpected status code:", response.status);
          // Xử lý trường hợp khi mã trạng thái không phải là 200 hoặc 201
        }
      } catch (error) {
        if (error.response) {
          // Server trả về phản hồi với mã lỗi không phải 2xx
          console.error("Error response status:", error.response.status);
          console.error("Error response data:", error.response.data);
          // Xử lý lỗi tùy thuộc vào mã trạng thái
          if (error.response.status === 400) {
            toast.error("Something went wrong");
            console.error("Bad Request: Invalid data submitted.");
          } else if (error.response.status === 401) {
            toast.error("Something went wrong");
            console.error("Unauthorized: Invalid credentials.");
          } else if (error.response.status === 500) {
            toast.error("Something went wrong");
            console.error("Server Error: Please try again later.");
          }
        }
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="bg-transparent rounded-none grid w-full grid-cols-2">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="background login" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
