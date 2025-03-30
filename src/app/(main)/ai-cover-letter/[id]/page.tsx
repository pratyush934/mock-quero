import React from "react";

const DynamicAICoverLetter = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <div>DynamicAICoverLetter {id}</div>;
};

export default DynamicAICoverLetter;
