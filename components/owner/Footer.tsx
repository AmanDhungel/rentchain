import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Why Choose us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Testimonial
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms and Condition
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Property management
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Account Management
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  RentChain E-Commerce
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Tenant Management
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  AI Agreement Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacts us</h4>

            <div className="flex items-start gap-3 text-sm mb-3">
              <Mail className="mt-1" size={16} />
              <div>
                <p className="text-sm">rentchain@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm mb-3">
              <Phone className="mt-1" size={16} />
              <div>
                <p className="text-sm">+977 9839943338</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm mb-4">
              <MapPin className="mt-1" size={16} />
              <div>
                <p className="text-sm">Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="flex gap-3 items-center mb-4">
              {/* App store badges - replace with your image paths or remote URLs */}
              <div className="w-36 h-10 relative">
                <Image
                  src="/assets/appstore-badge.png"
                  alt="App Store"
                  fill
                  sizes="(max-width: 768px) 100vw, 36px"
                  className="object-contain"
                />
              </div>
              <div className="w-36 h-10 relative">
                <Image
                  src="/assets/playstore-badge.png"
                  alt="Google Play"
                  fill
                  sizes="(max-width: 768px) 100vw, 36px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 md:mb-0 text-gray-400 flex items-center">
          <hr className=" w-1/2" />
          <span className="text-nowrap mr-2 text-white ml-4">
            Copyright ©{new Date().getFullYear()} Gurukul Hub
          </span>
          <div className="flex gap-3 mr-4">
            <Facebook size={14} />
            <Twitter size={14} />
            <Instagram size={14} />
            <Linkedin size={14} />
          </div>
          <hr className="w-1/2" />
        </div>
      </div>
    </footer>
  );
}
