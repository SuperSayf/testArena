import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Button from '../components/button'

export default function OverflowCardPP(props) {
  const { image, title, description, views, endDate, onClick, isRegistered, onButtonClick } = props;
  const [transform, setTransform] = React.useState("");
  const [flipped, setFlipped] = React.useState(false);

  const handleMouseMove = (event) => {
    const card = event.currentTarget;
    const boundingRect = card.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left - boundingRect.width / 2;
    const offsetY = event.clientY - boundingRect.top - boundingRect.height / 2;
    const transform = `perspective(600px) rotateX(${-offsetY / 10
      }deg) rotateY(${offsetX / 10}deg)`;
    setTransform(transform);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  const handleClick = () => {
    setFlipped(!flipped);
    onClick();
  };

  const handleBtnClick = (event) => {
    event.stopPropagation();
    onButtonClick();
  };

  const frontStyles = {
    position: "relative",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
    transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)",
  };

  const backStyles = {
    position: "absolute",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
    transform: flipped ? "rotateY(0deg)" : "rotateY(180deg)",
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: 320 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={
        {
          transform,
          transition: "transform 0.2s ease-out",
          cursor: "pointer"
        }
      }
    >
      <div style={frontStyles}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img
              src={image}
              srcSet={`${image}?auto=format&fit=crop&w=318&dpr=2 2x`}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
          {title}
        </Typography>
        <Typography level="body2" sx={{ mt: 2, mb: 2 }}>
          Click <b>here</b> to see details
        </Typography>
        <Divider />
        <CardOverflow
          sx={{
            display: "flex",
            gap: 1.5,
            py: 1.5,
            px: "var(--Card-padding)"
          }}
        >
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            {views} views
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            {endDate}
          </Typography>
        </CardOverflow>
      </div>
      <div style={backStyles}>
        <CardOverflow>
          {/* Add Whatever for the back of the card */}
          <Typography level="body2" sx={{ mt: 2, mb: 2 }}>
            {description}
          </Typography>
          {/* Add a button, the text is "Register" if isRegister is true, else the text is "Leave" */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Button
              name={isRegistered ? "Leave" : "Register Now"}
              onClick={handleBtnClick}
            />
          </div>

        </CardOverflow>
      </div>
    </Card>
  );
}