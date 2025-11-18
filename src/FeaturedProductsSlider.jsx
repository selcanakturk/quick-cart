import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedProductsSlider({ products, onProductClick }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      style={{
        padding: "24px 0 32px",
        marginBottom: "16px",
        borderRadius: "20px",
        background:
          "linear-gradient(135deg, rgba(25,118,210,0.06), rgba(0,0,0,0))",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "12px",
          padding: "0 8px 0 4px",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
              color: "#102a43",
            }}
          >
            Featured Picks
          </h3>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "13px",
              color: "#627d98",
            }}
          >
            Discover trending products hand-picked for you.
          </p>
        </div>
      </div>

      <Slider {...settings}>
        {products.map((p) => {
          const imageUrl = `https://picsum.photos/seed/product${p.id}/500/350`;

          return (
            <div key={p.id} style={{ padding: "0 20px" }}>
              <div
                style={{
                  cursor: onProductClick ? "pointer" : "default",
                  background: "#fff",
                  borderRadius: "14px",
                  padding: "12px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.12)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  height: "380px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
                onClick={() => onProductClick && onProductClick(p.id)}
              >
                <img
                  src={imageUrl}
                  alt={p.productName}
                  style={{
                    width: "100%",
                    height: "230px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "3px 8px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(25,118,210,0.08)",
                      color: "#1976d2",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".04em",
                    }}
                  >
                    Featured
                  </span>

                  <h4
                    style={{
                      fontSize: "16px",
                      margin: "2px 0 0",
                      fontWeight: 600,
                      color: "#102a43",
                      height: "40px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {p.productName}
                  </h4>

                  <div
                    style={{
                      marginTop: "4px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "2px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#0f766e",
                          fontSize: "16px",
                        }}
                      >
                        ${p.unitPrice}
                      </span>
                      {p.unitsInStock != null && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#9fb3c8",
                          }}
                        >
                          Stok: {p.unitsInStock}
                        </span>
                      )}
                    </div>

                    {p.quantityPerUnit && (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#627d98",
                        }}
                      >
                        {p.quantityPerUnit}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}