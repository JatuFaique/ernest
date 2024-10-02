import useSWR from 'swr';


const ACCESS_KEY = process.env.NEXT_PUBLIC_API_KEY;



// Fetcher function to make requests using fetch
const fetcher = async (url) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data.results;
};

const useUnsplashPhotos = (query, perPage = 1) => {
  const { data, error } = useSWR(
    query ? `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}` : null,
    fetcher
  );

  return {
    photos: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUnsplashPhotos;
