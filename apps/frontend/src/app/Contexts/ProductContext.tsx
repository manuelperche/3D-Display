import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { trpc } from "../Utils/trpc";
import type { Comment, Product } from "../Types/Product";
import Loader from "../Components/loader";

interface ProductContext {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>
  comments: Comment[];
  createLocalComment: (comment: Comment) => void;
  updateLocalComment: (commentId: string, text: string, updatedAt: string) => void;
  deleteLocalComment: (commentId: string) => void;
}

const Context = createContext<ProductContext>({} as ProductContext);

export function useProduct() {
  return useContext(Context);
}

function ProductProvider({ children, id }: { children: ReactNode, id: string }) {
  const { data, isLoading } = trpc.products.getProduct.useQuery(id);

  const [product, setProduct] = useState<Product | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (data?.comments) {
      setComments(data.comments);
    }
  }, [data?.comments]);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  function createLocalComment(comment: Comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  function updateLocalComment(commentId: string, text: string, updatedAt: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, text, updatedAt };
        }
        return comment;
      });
    });
  }

  function deleteLocalComment(commentId: string) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== commentId);
    });
  }

  return (
    <Context.Provider
      value={{
        product: product || ({} as Product),
        setProduct,
        comments,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
      }}
    >
      {isLoading ? <Loader /> : children}
    </Context.Provider>
  );
}

export default ProductProvider;
