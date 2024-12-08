import React, { useEffect } from "react";
import generateSkeleton, { getCacheDOM } from "./generate";

export default ({ id, loading, children }) => {
  const cacheDOM = getCacheDOM(id);

  useEffect(() => {
    const instance = new generateSkeleton({ id, root });
    instance.performTraverseNode();
  }, []);

  if (loading && cacheDOM) {
    return <div dangerouslySetInnerHTML={{ __html: cacheDOM }}></div>;
  }
  return children;
};
