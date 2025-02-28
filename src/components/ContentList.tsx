import { Box, CircularProgress, Typography } from "@mui/material";
import { JSX } from "react";

interface ContentListProps<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
  renderItem: (item: T) => JSX.Element;
}

const ContentList = <T,>({ data, loading, error, renderItem }: ContentListProps<T>) => {
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
      {data?.map(renderItem)}
    </Box>
  );
};

export default ContentList;
