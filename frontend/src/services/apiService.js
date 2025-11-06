import { supabase } from '../lib/supabaseClient';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/v1/ror';

const getHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (session) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  return headers;
};

export const getNewListings = async () => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/listings/new`, { headers });
  if (!response.ok) {
    throw new Error('Could not fetch new listings');
  }
  return response.json();
};

export const searchListings = async (query) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/listings/search?q=${query}`, { headers });
  if (!response.ok) {
    throw new Error('Could not search listings');
  }
  return response.json();
};

export const getListings = async (filters) => {
  const headers = await getHeaders();
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE_URL}/listings?${params.toString()}`, { headers });
  if (!response.ok) {
    throw new Error('Could not fetch listings');
  }
  return response.json();
};

export const getListing = async (id) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/listings/${id}`, { headers });
  if (!response.ok) {
    throw new Error('Could not fetch listing');
  }
  return response.json();
};

export const postAd = async (adData) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/listings`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'multipart/form-data' }, // Let browser set content type for multipart
    body: adData,
  });
  if (!response.ok) {
    throw new Error('Could not post ad');
  }
  return response.json();
};

export const getCategories = async () => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/categories`, { headers });
  if (!response.ok) {
    throw new Error('Could not fetch categories');
  }
  return response.json();
};

export const getMyListings = async () => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/listings/user/my-listings`, { headers });
  if (!response.ok) {
    throw new Error('Could not fetch user listings');
  }
  return response.json();
};

export const getFavorites = async () => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/favorites`, { headers });
  if (!response.ok) {
    throw new Error('Could not fetch favorites');
  }
  return response.json();
};

export const addFavorite = async (listingId) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ listing_id: listingId }),
  });
  if (!response.ok) {
    throw new Error('Could not add favorite');
  }
  return response.json();
};

export const removeFavorite = async (listingId) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ listing_id: listingId }),
  });
  if (!response.ok) {
    throw new Error('Could not remove favorite');
  }
  return response.json();
};
