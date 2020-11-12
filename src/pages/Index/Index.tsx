import React, { useEffect } from 'react'

const Index = (props: { history: string[]; }) => {
  useEffect(() => {
    const token = localStorage.getItem('CA_Token');
    if (!token) {
      props.history.push("/login");
    } else {
      props.history.push("/dashboard");
    }
  }, [0]);
  return (
    <div></div>
  )
}

export default Index
