import { UIRenderOptions } from "./utils/uiRender";


// slash commands
export interface SlashCommands {
  command: any;
  navigateTo: string;
}




// Navigation
export interface NavigatePropsProps {
  interaction: any;
  navigate: (pathname: string) => void;
  render: (msg: any, options: UIRenderOptions) => void;
  deferRender: () => void;
  pathname: string;
  route: string;
  params: {
    [key: string]: string;
  };
  searchParams?: {
    [key: string]: string;
  }
  globalMetadata: any;
  ButtonBuilder: any;
}

export interface NavigateRouteProps {
  navigate: (pathname: string) => void;
  pathname: string;
  route: string;
  params: {
    [key: string]: string;
  };
  searchParams?: {
    [key: string]: string;
  }
  globalMetadata: any;
}

export interface NavigateOptions {
  blank?: boolean;
  searchParams?: {
    [key: string]: string;
  };
}

export interface CustomRoutes {
  route: string; // /profile/:id
  component: () => void;
  subRoutes?: CustomRoutes[];
}

export interface RouteTree {
  path?: string;
  route: string;
  isDirectory: boolean;
  children: RouteTree[];
  component?: (props: NavigatePropsProps | NavigateRouteProps) => void | string;
}

export interface UIMessage {
  content?: string;
  ephemeral?: boolean;
  embeds?: Embed[];
  row1?: UIMessageCustomComponentRow;
  row2?: UIMessageCustomComponentRow;
  row3?: UIMessageCustomComponentRow;
  row4?: UIMessageCustomComponentRow;
  row5?: UIMessageCustomComponentRow;
}

type UIMessageCustomComponentRow = UIMessageCustomButton[] | UIMessageCustomSelectMenu[];


export interface UIMessageCustomButton {
  type: 2;
  custom_id?: string;
  navigateTo?: string; // will overwrite custom_id
  onClick?: () => void; // will overwrite navigateTo
  label?: string;
  style?: number;
  emoji?: string;
  url?: string;
  disabled?: boolean;
}

export interface UIMessageCustomSelectMenu {
  type: 3;
  placeholder: string;
  custom_id?: string;
  options: UIMessageCustomSelectOption[];
}

export interface UIMessageCustomSelectOption {
  label: string;
  navigateTo?: string; // either one must be present
  onClick?: () => void; // either one must be present // will overwrite navigateTo
}

export interface UIMessageOptional extends Partial<UIMessage> {
  title?: string;
  description?: string;
}

// message discord js
export interface EmbedFooter {
  text: string;
  icon_url?: string;
}

export interface EmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface EmbedImage {
  url: string;
}

export interface EmbedThumbnail {
  url: string;
}

export interface Embed {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  timestamp?: string;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

export interface Button {
  type: 2;
  custom_id: string;
  label: string;
  style: number;
  emoji?: {
    name: string;
    animated: boolean;
  };
  url?: string;
  disabled?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectMenu {
  type: 3;
  custom_id: string;
  placeholder: string;
  options: SelectOption[];
}

export interface ComponentRow {
  type: 1;
  components: (Button | SelectMenu)[];
}

export interface MessageResponse {
  content?: string;
  ephemeral?: boolean;
  embeds?: Embed[];
  components?: ComponentRow[];
}
