import AluminumProfileConfigurator from "@/components/pages/HomePage/Configurator";
import { fetchDataOptions } from "@/api";

export default async function ConfiguratorPage() {
  const optionsData = await fetchDataOptions();
  return <AluminumProfileConfigurator optionsData={optionsData} />;
}
