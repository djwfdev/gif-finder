export type Gif = {
  id: string;
  images: {
    fixed_width: {
      url: string;
      width: number;
      height: number;
    };
  };
  title: string;
};

export const GIF_LIMIT = 12;