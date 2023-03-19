import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

export default function OverflowCard(props) {
  const { image, title, description, views, endDate } = props;
  const [transform, setTransform] = React.useState("");

  const handleMouseMove = (event) => {
    const card = event.currentTarget;
    const boundingRect = card.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left - boundingRect.width / 2;
    const offsetY = event.clientY - boundingRect.top - boundingRect.height / 2;
    const transform = `perspective(600px) rotateX(${
      -offsetY / 10
    }deg) rotateY(${offsetX / 10}deg)`;
    setTransform(transform);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: 320 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.2s ease-out" }}
    >
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
      <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
        {description}
      </Typography>
      <Divider />
      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1.5,
          px: "var(--Card-padding)",
          bgcolor: "background.level1",
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
    </Card>
  );
}
