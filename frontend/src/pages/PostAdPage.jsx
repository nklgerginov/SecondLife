import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const PostAdPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    size: '',
    condition: '',
    category: '',
    description: '',
    location: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Posting ad:', formData);
    // Handle form submission
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Post a New Listing
          </h1>
          <p className="text-muted-foreground text-lg">Share your pre-loved fashion with the community</p>
        </div>
        <Card className="border-2 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl sm:text-3xl">Listing Details</CardTitle>
            <CardDescription className="text-base">
              Fill out the form below to create your listing. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Vintage Denim Jacket"
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand" className="text-base font-medium">Brand *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                    placeholder="e.g. Levi's"
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-base font-medium">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="0.00"
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size" className="text-base font-medium">Size *</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => handleChange('size', e.target.value)}
                    placeholder="e.g. M, L, 8, 10"
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition" className="text-base font-medium">Condition *</Label>
                  <Input
                    id="condition"
                    value={formData.condition}
                    onChange={(e) => handleChange('condition', e.target.value)}
                    placeholder="e.g. Excellent, Good, Fair"
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-medium">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    placeholder="e.g. Dresses, Outerwear"
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-medium">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="City, State"
                  required
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe your item in detail..."
                  rows={6}
                  required
                  className="text-base border-2 focus:border-primary resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images" className="text-base font-medium">Images</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="h-12 text-base border-2 cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  Upload up to 5 images of your item. High-quality photos help your listing stand out!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button type="submit" size="lg" className="flex-1 h-14 text-base font-semibold shadow-lg hover:shadow-xl">
                  Post Listing
                </Button>
                <Button type="button" variant="outline" size="lg" className="flex-1 h-14 text-base font-semibold border-2">
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostAdPage;
