import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { Card } from './Card';
import { useNavigate } from 'react-router-dom';


type restaurantinfo = {
  logo: string,
  name: string,
  photo: string
  id: string
}

export const App = (url: string) => {
  const a: restaurantinfo[] = [{
    name: "a",
    logo: "b",
    photo: "s",
    id: "g"
  }]
  // const [cardnumber, setcardnumber] = React.useState<number>(1)
  const [getValue, setgetValue] = React.useState<restaurantinfo[]>(a)
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState(false);
  
  useEffect(() => {
    (async () => {
      setgetValue([])
      try {
        const response = await fetch(url);
        const body = await response.json();
        const responsejson: restaurantinfo[] = body["data"]
        responsejson.forEach((elements, index) => {
          console.log(elements.logo)
          const data: restaurantinfo = {
            logo: elements.logo,
            name: elements.name,
            photo: elements.photo,
            id: elements.id
          }
          getValue.push(data)
        })
        setgetValue(getValue)
      }
      catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { getValue, isLoading, isError };
}
export default App;
