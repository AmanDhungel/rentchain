"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Building, Eye, EyeOff } from "lucide-react";
import { useAuthContext } from "./AuthContext";

interface SignInFormData {
  email: string;
  password: string;
}

interface JoinPlatformFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  platformRole: string;
  password: string;
  confirmPassword: string;
}

const RentChainAuth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login, register, loading } = useAuthContext();

  const {
    register: registerSignIn,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors },
  } = useForm<SignInFormData>();

  const {
    register: registerJoin,
    handleSubmit: handleJoinSubmit,
    formState: { errors: joinErrors },
  } = useForm<JoinPlatformFormData>();

  const onSignInSubmit = async (data: SignInFormData) => {
    try {
      await login(data.email, data.password);
    } catch (err: any) {
      alert(err?.message || "Login failed");
    }
  };

  const onJoinSubmit = async (data: JoinPlatformFormData) => {
    try {
      await register({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.platformRole,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    } catch (err: any) {
      alert(err?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#eefdfc" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0fb481, #0d9788)",
              }}>
              <Building size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RentChain</h1>
          <p className="text-gray-600">
            {isSignIn
              ? "Blockchain Platform"
              : "Join the blockchain rental revolution"}
          </p>
          {isSignIn && (
            <p className="text-gray-500 mt-4">Welcome back to the platform!</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                isSignIn
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                !isSignIn
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              Join Platform
            </button>
          </div>

          {isSignIn ? (
            <form
              onSubmit={handleSignInSubmit(onSignInSubmit)}
              className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Platform Access
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your platform email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                      {...registerSignIn("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {signInErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {signInErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors pr-12"
                        {...registerSignIn("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {signInErrors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {signInErrors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="my-6 border-t border-gray-200"></div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md">
                  {loading ? "Processing..." : "Access Platform"}
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleJoinSubmit(onJoinSubmit)}
              className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Create Account
                </h3>
                <p className="text-gray-600 text-sm mb-6">Join Platform</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter your full legal name
                    </label>
                    <input
                      type="text"
                      placeholder="Full legal name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                      {...registerJoin("fullName", {
                        required: "Full name is required",
                      })}
                    />
                    {joinErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {joinErrors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter your email address
                    </label>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                      {...registerJoin("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {joinErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {joinErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                      {...registerJoin("phoneNumber", {
                        required: "Phone number is required",
                      })}
                    />
                    {joinErrors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {joinErrors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Role
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                      {...registerJoin("platformRole", {
                        required: "Platform role is required",
                      })}>
                      <option value="">Select your role</option>
                      <option value="tenant">
                        Tenant (Looking for rental)
                      </option>
                      <option value="landlord">Landlord</option>
                      <option value="agent">Real Estate Agent</option>
                      <option value="investor">Investor</option>
                    </select>
                    {joinErrors.platformRole && (
                      <p className="text-red-500 text-sm mt-1">
                        {joinErrors.platformRole.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors pr-12"
                        {...registerJoin("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {joinErrors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {joinErrors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors pr-12"
                        {...registerJoin("confirmPassword", {
                          required: "Confirm your password",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {joinErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {joinErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md mt-6">
                  {loading ? "Processing..." : "Join RentChain Platform"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentChainAuth;
