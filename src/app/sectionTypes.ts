// Тип фурнитуры
export type HardwareType = "handle" | "hinge";

export interface HardwareOption {
  id: number;
  name: string;
  img: string;
  type: HardwareType;
  price: number;
}

export interface SectionOption {
  id: number;
  name: string;
  imgs: string[];
  price: number;
  anodirs: AnodirOption[];
  hardwares: HardwareOption[]; 
}

export interface AnodirOption {
  id: number;
  name: string;
  img: string;
  price: number;
  borderColor: string;
}

export interface FillingOption {
  id: number;
  name: string;
  img: string;
  price: number;
  backgroundColor: string;
}

export type SectionOptions = SectionOption[];
export type AnodirOptions = AnodirOption[];
export type FillingOptions = FillingOption[];
export type HardwareOptions = HardwareOption[];
export interface AllOptions {
  sectionOptions: SectionOptions;
  anodirOptions: AnodirOptions;
  fillingOptions: FillingOptions;
  hardwareOptions: HardwareOptions;
}