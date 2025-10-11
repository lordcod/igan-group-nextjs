"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchCartItems, addCartItem } from "@/api";
import HomeContent from "./HomeContent";

const NULLABLE_SELECTED_OPTIONS = {
  section: null,
  anodir: null,
  filling: null,
  hardware: [],
  width: 600,
  height: 800,
  quantity: 1,
};

export default function AluminumProfileConfigurator({ optionsData }) {
  const [selectedOptions, setSelectedOptions] = useState(
    NULLABLE_SELECTED_OPTIONS
  );
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const {
    sectionOptions = [],
    anodirOptions = [],
    fillingOptions = [],
    hardwareOptions = [],
  } = optionsData || {};

  useEffect(() => {
    fetchCartItems().then((cartData) => {
      setCartItemsCount(cartData.length);
      setLoading(false);
    });
  }, []);

  const calculateItemPrice = useCallback((options) => {
    const { section, anodir, filling, hardware, quantity, width, height } =
      options;
    let basePrice = 0;
    if (section) basePrice += section.price;
    if (anodir) basePrice += anodir.price;
    if (filling) basePrice += filling.price;
    hardware.forEach(
      ([item, quantities]) => (basePrice += item.price * quantities)
    );
    return basePrice * quantity * ((width * height) / 1000000);
  }, []);

  const calculateTotal = useCallback(() => {
    return calculateItemPrice(selectedOptions);
  }, [selectedOptions, calculateItemPrice]);

  const addToCart = useCallback(() => {
    const { section, anodir, filling, hardware, width, height } =
      selectedOptions;

    if (!section || !anodir || !filling) return;

    const cartItem = {
      section: section.id,
      anodir: anodir.id,
      filling: filling.id,
      hardwares: hardware.map(([h,q]) => [h.id, q]),
      width,
      height,
      price: calculateTotal(),
    };

    addCartItem(cartItem).then((res) => {
      alert("Товар добавлен в корзину!");
      setCartItemsCount(cartItemsCount + 1);
      setSelectedOptions(NULLABLE_SELECTED_OPTIONS);
    });
  }, [selectedOptions, calculateTotal]);

  const getAvailableAnodirOptions = useCallback(() => {
    const anodirs = selectedOptions.section?.anodirs;
    if (!anodirs) return anodirOptions;
    return anodirOptions.filter((option) =>
      anodirs.find((opt) => opt.id === option.id)
    );
  }, [selectedOptions.section, anodirOptions]);

  const getAvailableHardwareOptions = useCallback(
    (type) => {
      const sectionHardware = selectedOptions.section?.hardwares;
      if (!sectionHardware) return [];
      return hardwareOptions.filter(
        (option) =>
          option.type === type &&
          sectionHardware.find((opt) => opt.id === option.id)
      );
    },
    [selectedOptions.section, hardwareOptions]
  );

  const isHardwareSelected = useCallback(
    (id) => Boolean(selectedOptions.hardware.find(([h]) => h.id === id)),
    [selectedOptions.hardware]
  );

  const toggleHardware = useCallback((hardware, quantities) => {
    setSelectedOptions((prev) => {
      const filtered = prev.hardware.filter(([h]) => h.id !== hardware.id);
      return {
        ...prev,
        hardware:
          quantities > 0 ? [...filtered, [hardware, quantities]] : filtered,
      };
    });
  }, []);

  const updateDimensions = useCallback((field, value) => {
    const clamped = Math.max(100, Math.min(2500, value));
    setSelectedOptions((prev) => ({ ...prev, [field]: clamped }));
  }, []);

  const updateQuantity = useCallback((change) => {
    setSelectedOptions((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change),
    }));
  }, []);

  const isOrderComplete = useMemo(() => {
    const { section, anodir, filling } = selectedOptions;
    return Boolean(section && anodir && filling);
  }, [selectedOptions]);

  if (loading) return null;

  return (
    <HomeContent
      selectedOptions={selectedOptions}
      calculateTotal={calculateTotal}
      cartItemsCount={cartItemsCount}
      updateDimensions={updateDimensions}
      updateQuantity={updateQuantity}
      sectionOptions={sectionOptions}
      setSelectedOptions={setSelectedOptions}
      fillingOptions={fillingOptions}
      getAvailableHardwareOptions={getAvailableHardwareOptions}
      isHardwareSelected={isHardwareSelected}
      toggleHardware={toggleHardware}
      isOrderComplete={isOrderComplete}
      addToCart={addToCart}
      getAvailableAnodirOptions={getAvailableAnodirOptions}
    />
  );
}
