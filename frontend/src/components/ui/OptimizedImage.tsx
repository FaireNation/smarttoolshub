import React from 'react';
import { Image as HeroImage } from "@heroui/react";

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    loading?: "lazy" | "eager";
    sizes?: string;
    priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    width = 400,
    height = 300,
    className,
    loading = "lazy",
    sizes,
    priority = false,
}) => {
    // Generate optimized Unsplash URLs with proper dimensions
    const getOptimizedImageUrl = (originalUrl: string, targetWidth: number, targetHeight: number) => {
        if (originalUrl.includes('unsplash.com')) {
            // Extract the photo ID from Unsplash URL
            const photoId = originalUrl.match(/photo-([a-zA-Z0-9_-]+)/)?.[1];
            if (photoId) {
                return `https://images.unsplash.com/photo-${photoId}?w=${targetWidth}&h=${targetHeight}&fit=crop&auto=format&q=80&dpr=1`;
            }
        }
        if (originalUrl.includes('pravatar.cc')) {
            return `${originalUrl}?w=${targetWidth}&h=${targetHeight}`;
        }
        return originalUrl;
    };

    // Generate srcSet for responsive images with proper aspect ratios
    const generateSrcSet = (baseUrl: string, targetWidth: number, targetHeight: number) => {
        const optimizedUrl1x = getOptimizedImageUrl(baseUrl, targetWidth, targetHeight);
        const optimizedUrl2x = getOptimizedImageUrl(baseUrl, targetWidth * 2, targetHeight * 2);
        return [
            `${optimizedUrl1x} 1x`,
            `${optimizedUrl2x} 2x`
        ].join(', ');
    };

    const optimizedSrc = getOptimizedImageUrl(src, width, height);
    const srcSet = generateSrcSet(src, width, height);

    return (
        <HeroImage
            src={optimizedSrc}
            srcSet={srcSet}
            alt={alt}
            width={width}
            height={height}
            className={className}
            loading={priority ? "eager" : loading}
            sizes={sizes || `${width}px`}
            style={{
                aspectRatio: `${width}/${height}`,
                width: '100%',
                height: 'auto',
            }}
            onError={(e) => {
                // Fallback to original source on error
                const target = e.target as HTMLImageElement;
                if (target.src !== src) {
                    target.src = src;
                }
            }}
        />
    );
};

export default OptimizedImage;
