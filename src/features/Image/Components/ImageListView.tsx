import { Eye, Download, Trash2, Check } from "lucide-react";
import type { ImageItem } from "../data/images.data";

interface ImageListViewProps {
  images: ImageItem[];
  selectedIds: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onViewImage: (image: ImageItem) => void;
  onDeleteImage?: (id: string) => void;
}

const ImageListView = ({
  images,
  selectedIds,
  onSelectRow,
  onSelectAll,
  onViewImage,
  onDeleteImage,
}: ImageListViewProps) => {
  const isAllSelected = images.length > 0 && selectedIds.length === images.length;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#232830] bg-[#121519] text-xs font-semibold uppercase tracking-wider text-white/50">
              <th className="py-4 pl-5 pr-2 w-10">
                <label className="relative flex h-4 w-4 cursor-pointer items-center justify-center rounded border border-white/20 bg-[#161a1f]">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="peer sr-only"
                  />
                  {isAllSelected && <Check size={11} strokeWidth={3} className="text-[#22c55e]" />}
                </label>
              </th>
              <th className="py-4 px-3 font-medium text-white/60">FILE</th>
              <th className="py-4 px-3 font-medium text-white/60">ALBUM</th>
              <th className="py-4 px-3 font-medium text-white/60">EVENT</th>
              <th className="py-4 px-3 font-medium text-white/60">FORMAT</th>
              <th className="py-4 px-3 font-medium text-white/60">SIZE</th>
              <th className="py-4 px-3 font-medium text-white/60">UPLOADER</th>
              <th className="py-4 px-4 text-right font-medium text-white/60">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#20252e]">
            {images.map((image) => {
              const isSelected = selectedIds.includes(image.id);
              return (
                <tr key={image.id} className="transition-colors hover:bg-[#1b2027]">
                  <td className="py-3.5 pl-5 pr-2">
                    <label className="relative flex h-4 w-4 cursor-pointer items-center justify-center rounded border border-white/20 bg-[#161a1f]">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onSelectRow(image.id, e.target.checked)}
                        className="peer sr-only"
                      />
                      {isSelected && <Check size={11} strokeWidth={3} className="text-[#22c55e]" />}
                    </label>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={image.url}
                        alt={image.fileName}
                        className="h-10 w-10 rounded-lg border border-[#2b323d] object-cover shrink-0"
                      />
                      <span
                        onClick={() => onViewImage(image)}
                        className="cursor-pointer font-medium text-white hover:text-[#4ade80]"
                      >
                        {image.fileName}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-xs text-white/70">{image.albumName}</td>
                  <td className="py-3.5 px-3 text-xs text-white/50">{image.eventShort}</td>
                  <td className="py-3.5 px-3">
                    <span className="rounded-md border border-white/10 bg-[#121519] px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                      {image.format}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-white/60 font-medium">{image.size}</td>
                  <td className="py-3.5 px-3 text-xs text-white/50">{image.uploader}</td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewImage(image)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 hover:text-white"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = image.url;
                          link.download = image.fileName;
                          link.target = "_blank";
                          link.click();
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 hover:text-white"
                      >
                        <Download size={13} />
                      </button>
                      {onDeleteImage && (
                        <button
                          type="button"
                          onClick={() => onDeleteImage(image.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#38181a] bg-[#121519] text-rose-400 hover:bg-[#38181a]"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImageListView;
