const maxWidth = 280;
const maxHeight = 200;


export const FacadePreview = ({ selectedOptions }) => {
  const aspectRatio = selectedOptions.width / selectedOptions.height;

  let previewWidth, previewHeight;
  if (aspectRatio > maxWidth / maxHeight) {
    previewWidth = maxWidth;
    previewHeight = maxWidth / aspectRatio;
  } else {
    previewHeight = maxHeight;
    previewWidth = maxHeight * aspectRatio;
  }

  const frameColor = selectedOptions.anodir?.borderColor || "#C0C0C0";
  const fillColor = selectedOptions.filling?.backgroundColor || "#ffffff";
  const profileName = selectedOptions.section?.name || "Не выбран";

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
      <div
        className="relative"
        style={{ width: previewWidth + 40, height: previewHeight + 40 }}
      >
        <div
          className="absolute top-2 left-2 rounded-lg opacity-20"
          style={{
            width: previewWidth + 20,
            height: previewHeight + 20,
            backgroundColor: "#000000",
          }}
        />

        {/* Основной фасад */}
        <div
          className="relative rounded-lg border-4 shadow-lg"
          style={{
            width: previewWidth + 20,
            height: previewHeight + 20,
            borderColor: frameColor,
            backgroundColor: frameColor,
          }}
        >
          {/* Заполнение */}
          <div
            className="absolute inset-2 rounded"
            style={{ backgroundColor: fillColor }}
          >
            {selectedOptions.filling?.name.includes("Зеркало") && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded" />
            )}
            {selectedOptions.filling?.name.includes("Стекло") && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 rounded" />
            )}
          </div>

          {/* Ручка (если выбрана) */}
          {Object.keys(selectedOptions.hardware).some((h) => h.type === "handle") && (
            <div
              className="absolute right-4 rounded-full shadow-sm"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                width: 8,
                height: 20,
                backgroundColor: frameColor,
                filter: "brightness(0.8)",
              }}
            />
          )}
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="text-lg font-semibold text-gray-800">{profileName}</div>
        <div className="text-sm text-gray-600">
          {selectedOptions.width} × {selectedOptions.height} мм
        </div>
        {selectedOptions.anodir && (
          <div className="text-sm text-gray-600">
            Цвет: {selectedOptions.anodir.name}
          </div>
        )}
        {selectedOptions.filling && (
          <div className="text-sm text-gray-600">
            Заполнение: {selectedOptions.filling.name}
          </div>
        )}
      </div>
    </div>
  );
};