'use client';

import { useEffect, useState } from 'react';
import { getSimilarProductsAction } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

interface SimilarProductsProps {
  productDescription: string;
}

export default function SimilarProducts({ productDescription }: SimilarProductsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      const result = await getSimilarProductsAction(productDescription);
      if (result.success && result.data) {
        setRecommendations(result.data);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, [productDescription]);

  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((rec, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-start gap-3 text-lg">
                <Lightbulb className="h-6 w-6 flex-shrink-0 text-accent" />
                <span className="font-body">AI Suggestion</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">{rec}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
