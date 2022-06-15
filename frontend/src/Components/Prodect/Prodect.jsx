import React from 'react';
import { useParams } from 'react-router-dom';

export default function Prodect() {
  let param = useParams();
  let { slug } = param;
  console.log(slug);
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
