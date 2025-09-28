import React from 'react';
import { Card, CardBody } from "@heroui/react";
import { Star } from "lucide-react";
import { OptimizedImage } from '../../components/ui';

interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
}

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
    return (
        <section className="py-16 lg:py-24 bg-content1" aria-labelledby="testimonials-heading">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 id="testimonials-heading" className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-default-600 max-w-2xl mx-auto">
                        Don't just take our word for it - hear from our satisfied customers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="group hover:shadow-lg transition-shadow duration-300" role="listitem">
                            <CardBody className="p-6">
                                <div className="flex items-center gap-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i < testimonial.rating ? 'text-warning fill-current' : 'text-default-300'}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <blockquote className="text-default-700 mb-4 italic">"{testimonial.content}"</blockquote>
                                <div className="flex items-center gap-3">
                                    <OptimizedImage
                                        src={testimonial.avatar}
                                        alt={`${testimonial.name} profile picture`}
                                        className="rounded-full"
                                        width={40}
                                        height={40}
                                        sizes="40px"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm">{testimonial.name}</p>
                                        <p className="text-xs text-default-600">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
