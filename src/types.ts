export interface Routes {
    route: string; // /profile/:id
    component: () => void;
    subRoutes?: Routes[];
  }



  export interface  UIMessage {
    title: string;
    description?: string;
    embeds?: Embed[];
    row1?: 
  }

  export interface UIMessageOptional extends Partial<UIMessage>{
    title?: string;
    description?: string;
  }




  // message discord js
  interface EmbedFooter {
    text: string;
    icon_url?: string;
  }
  
  interface EmbedAuthor {
    name: string;
    url?: string;
    icon_url?: string;
  }
  
  interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
  }
  
  interface EmbedImage {
    url: string;
  }
  
  interface EmbedThumbnail {
    url: string;
  }
  
  interface Embed {
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
  
  interface Button {
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
  
  interface SelectOption {
    label: string;
    value: string;
  }
  
  interface SelectMenu {
    type: 3;
    custom_id: string;
    placeholder: string;
    options: SelectOption[];
  }
  
  interface ComponentRow {
    type: 1;
    components: (Button | SelectMenu)[];
  }
  
  interface MessageResponse {
    content?: string;
    ephemeral?: boolean;
    embeds?: Embed[];
    components?: ComponentRow[];
  }