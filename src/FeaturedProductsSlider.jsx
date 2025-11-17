import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedProductsSlider({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <Slider {...settings}>
        {products.map((p) => {
          const imageUrl = `https://picsum.photos/seed/product${p.id}/500/350`;

          return (
            <div key={p.id} style={{ padding: "0 15px" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  padding: "15px",
                  textAlign: "center",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  transition: "0.2s ease",
                  height: "400px",     
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={imageUrl}
                  alt={p.productName}
                  style={{
                    width: "100%",
                    height: "300px",        
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <h4
                  style={{
                    fontSize: "18px",
                    marginTop: "12px",
                    fontWeight: "600",
                    height: "48px",         
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {p.productName}
                </h4>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}