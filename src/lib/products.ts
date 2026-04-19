export interface Product {
  id: string;
  name: string;
  modelNumber: string;
  description: string;
  category: string;
  price?: string;
  image: string;
  tag?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sentinel 4K Ultra",
    modelNumber: "S-4K-AI-001",
    description: "AI-powered identification with human and vehicle detection. Features a Sony Starvis sensor for extreme low-light performance.",
    category: "CCTV Cameras",
    image: "/images/modern_4k_cctv_camera_1776596648585.png",
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "NightVision Pro NVR",
    modelNumber: "NVR-32CH-16TB",
    description: "32-channel network recorder with 16TB storage included. Supports H.265+ compression and dual-HDMI outputs.",
    category: "Recording Units",
    image: "/images/sleek_nvr_recorder_1776596665682.png",
    tag: "New",
  },
  {
    id: "3",
    name: "Thermal Guardian X1",
    modelNumber: "TGX-THERM-800",
    description: "High-precision thermal imaging for perimeter protection. Detects body heat up to 500 meters in total darkness.",
    category: "Specialized",
    image: "/images/thermal_imaging_camera_1776596750823.png",
    tag: "Professional",
  },
  {
    id: "4",
    name: "Intercom Smart Pro",
    modelNumber: "ISP-DBL-4K",
    description: "4K smart doorbell with facial recognition and two-way audio. Integrates seamlessly with mobile apps and smart home systems.",
    category: "Smart Home",
    image: "/images/smart_doorbell_camera_sleek_1776596777166.png",
    tag: "Smart Home",
  },
  {
    id: "5",
    name: "EagleEye Dome AI",
    modelNumber: "EE-DOME-5MP",
    description: "5MP vandal-proof dome camera with 360-degree rotation and AI tracking. IP67 rated for harsh environments.",
    category: "CCTV Cameras",
    image: "/images/modern_4k_cctv_camera_1776596648585.png",
  },
  {
    id: "6",
    name: "Hybrid NVR/DVR 168",
    modelNumber: "HYB-16CH-4TB",
    description: "Versatile hybrid recorder matching analog and IP systems. Perfect for upgrading existing infrastructures.",
    category: "Recording Units",
    image: "/images/sleek_nvr_recorder_1776596665682.png",
  },
  {
    id: "7",
    name: "PTZ Speed Pro",
    modelNumber: "PTZ-1080P-40X",
    description: "40x optical zoom professional PTZ camera. Rapid focus and precision movement tracking.",
    category: "CCTV Cameras",
    image: "/images/thermal_imaging_camera_1776596750823.png",
  },
  {
    id: "8",
    name: "BioAccess Gate Control",
    modelNumber: "BIO-GT-002",
    description: "Biometric access control system with facial recognition and finger print sensor.",
    category: "Access Control",
    image: "/images/smart_doorbell_camera_sleek_1776596777166.png",
  }
];
