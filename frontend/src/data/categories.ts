import {
    Zap,
    Hammer,
    Wrench,
    HardHat,
    LucideIcon,
} from "lucide-react";
import { products } from './products';

export interface Category {
    id: string;
    name: string;
    count: number;
    desc: string;
    icon: LucideIcon;
    image: string;
    color: string;
    slug: string;
}

// Function to calculate actual product count for a category
const getProductCountForCategory = (categoryName: string): number => {
    return products.filter(product =>
        product.category.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase().replace(/\s+/g, '-')
    ).length;
};

export const categories: Category[] = [
    {
        id: "1",
        name: "Power Tools",
        count: getProductCountForCategory("Power Tools"),
        desc: "Electric and battery-powered tools",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
        slug: "power-tools",
    },
    {
        id: "2",
        name: "Hand Tools",
        count: getProductCountForCategory("Hand Tools"),
        desc: "Essential manual workshop tools",
        icon: Hammer,
        image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop",
        color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        slug: "hand-tools",
    },
    {
        id: "3",
        name: "Hardware",
        count: getProductCountForCategory("Hardware"),
        desc: "Screws, bolts and fasteners",
        icon: Wrench,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        color: "bg-gradient-to-br from-orange-500 to-orange-600",
        slug: "hardware",
    },
    {
        id: "4",
        name: "Safety Equipment",
        count: getProductCountForCategory("Safety Equipment"),
        desc: "Personal protective equipment",
        icon: HardHat,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
        color: "bg-gradient-to-br from-red-500 to-red-600",
        slug: "safety-equipment",
    },
];