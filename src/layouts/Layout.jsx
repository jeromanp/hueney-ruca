import Header from "../components/Header";
import Footer from "../components/Footer";
import Preload from "components/Preload";
import { useEffect, useState } from "react";

export default function LayoutMain({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  });
  return (
    <>
      {loading ? (
        <Preload loading={loading} />
      ) : (
        <div>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}
