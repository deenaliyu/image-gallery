
import React, {useState, useEffect} from 'react';
import ImageCard from './component/imageCard';
import ImageSearch from './component/imageSearch';


function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch (`https://pixabay.com/api/?key=26724083-8ed2a17ddcb68862599c7c666&q=${term}&image_type=photo&pretty=true`)
    .then (res => res.json())
    .then (data => {
      setImages (data.hits);
      setIsLoading(false);
    })
    .catch (err => console.error(err));
  }, [term])
  return (
      <div className="container mx-auto">
        <ImageSearch  searchText={(text) => setTerm(text)}/>
        {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">Image Not Found</h1>}
       {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
          {images.map(image => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>}
      </div>
  );
}

export default App;
