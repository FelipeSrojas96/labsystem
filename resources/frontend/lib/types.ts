export interface Set {
    id: string;
    name: string;
    series: string;
    printed_total: number;
    total: number;
    ptcgo_code: string;
    release_date: string; 
    updated_at: string;   
    symbol_url: string;
    logo_url: string;
  }

  interface Market {
    id: string;
    url: string;
    updated_at: string;
    market: string;
    card: string;
  }
  
  interface Image {
    id: string;
    url: string;
    type: string;
    card: string;
  }
  
  export interface Card {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    types: string[];
    market: Market[];
    image: Image[];
    number: string;
    rarity: string;
    set: string;
  }