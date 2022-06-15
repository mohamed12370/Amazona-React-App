import React from 'react';
import { Link } from 'react-router-dom';
import data from '../../data';

export default function Home() {
  return (
    <>
      <h1>Featured Prodects</h1>
      <div className="prodects">
        {data.prodects.map((prodect) => {
          return (
            <div className="prodect" key={prodect.slug}>
              <Link to={`/prodect/${prodect.slug}`}>
                <img src={prodect.image} alt={prodect.name} />
              </Link>
              <div className="prodect-info">
                <Link to={`/prodect/${prodect.slug}/`}>
                  <p> {prodect.name} </p>
                </Link>
                <p>
                  <strong>$ {prodect.price}</strong>
                </p>
                <button>Add to card</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
