export function calcTotal({
  sectionPrice,
  anodirPrice,
  fillingPrice,
  width,
  height,
  facadeQty,
  hardwareMap, // { id: { price, qty } }
  delivery,
  labor,
}) {
  const area = (width * height) / 1_000_000; // мм² → м²
  const facadeCostPerM2 = sectionPrice + anodirPrice + fillingPrice;
  const facadeCost = facadeCostPerM2 * area * facadeQty;
  const hardwareCost = Object.values(hardwareMap).reduce(
    (sum, h) => sum + h.price * h.qty,
    0
  );
  return facadeCost + hardwareCost + delivery + labor;
}