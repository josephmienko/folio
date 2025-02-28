import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import HomeIcon from "@mui/icons-material/Home";
import OutlinedInput from "@mui/material/OutlinedInput";
import toTitleCase from "../../utils/toTitleCase";
import { H } from "vitest/dist/chunks/reporters.QZ837uWx";

export function Search({ mdCharWidth, widthShrinkage }: { mdCharWidth: string | number, widthShrinkage: number }) {
  return (
    <FormControl
      sx={{ width: { xs: "100%", md: `calc(${mdCharWidth} * ${widthShrinkage})` } }} // ✅ Dynamically scales width
      variant="outlined"
      fullWidth
    >
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function CategoryTags({ categories = [], widthShrinkage = 1 }: { categories?: string[], widthShrinkage?: number }) {
  const navigate = useNavigate();
  const { category } = useParams(); // Get active category from URL

  // Ensure widthShrinkage stays between 0 and 1 (avoid negative scaling)
  const safeShrinkage = Math.min(Math.max(widthShrinkage, 0), 1);

  // ✅ If no categories exist, make search box full width
  let mdCharWidth = categories.length === 0
    ? "100%" // Full width when no categories exist
    : `${categories.reduce((sum, str) => sum + str.length, 0) * safeShrinkage}ch`; // Dynamically scale down width

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2, backgroundColor: 'transparent' }}>
      <div></div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search mdCharWidth={mdCharWidth} widthShrinkage={safeShrinkage} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "thin",
        }}
      >
          {/* "All Categories" Chip */}
          <Chip icon={<HomeIcon />}
          label="All "
          size="medium"
          clickable
          onClick={() => navigate(`/blog`)}
          variant={category ? "outlined" : "filled"} // Filled if no category is selected
          color="primary"
        />


        {/* Dynamic Category Chips */}
        {categories.map((cat) => {
          const isActive = category?.toLowerCase() === cat.toLowerCase().replace(/\s+/g, "-");
          const formattedLabel = toTitleCase(cat); // Convert label to Title Case
          return (
            <Chip
              key={cat}
              label={formattedLabel} // Title Case for Display
              size="medium"
              clickable
              onClick={() => navigate(`/blog/${cat.toLowerCase().replace(/\s+/g, "-")}`)}
              variant={isActive ? "filled" : "outlined"} // Active = filled, Inactive = outlined
              color="primary"
            />
          );
        })}
      </Stack>
      <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search mdCharWidth={mdCharWidth} widthShrinkage={safeShrinkage} />
        </Box> 
      </Box>
    </Box>
  );
}

