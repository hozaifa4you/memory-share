"use client";
import axios from "axios";
import React from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "react-query";
// import { getTodos, postTodo } from "../my-api";

const getPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};
const postPosts = async (postData: any) => {
  const { data } = await axios.post<{ id: string; title: string }>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};

// Create a client
const queryClient = new QueryClient();

function Todos() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  // Mutations
  const mutation = useMutation({
    mutationFn: postPosts,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div>
      <ul>
        {query.data?.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "Do Laundry",
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

export default function App() {
  return <Todos />;
}
