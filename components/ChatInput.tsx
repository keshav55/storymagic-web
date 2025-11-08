"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Plus, ArrowUp, Square, X, ImageIcon, FileText, Brain } from "lucide-react";

type Mode = "quick" | "pro";

interface ChatInputProps {
  onSubmit?: (text: string, files: File[], mode: Mode, thinkingEnabled?: boolean) => void;
  placeholder?: string;
  showModeToggle?: boolean;
  autoFocus?: boolean;
  isLoading?: boolean;
  onStop?: () => void;
  availableModes?: Mode[];
  showThinkingToggle?: boolean;
}

export default function ChatInput({
  onSubmit,
  placeholder = "Ask anything",
  showModeToggle = true,
  autoFocus = false,
  isLoading = false,
  onStop,
  availableModes = ["quick", "pro"],
  showThinkingToggle = true,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<Mode>(availableModes[0] ?? "quick");
  const [thinkingEnabled, setThinkingEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!availableModes.includes(mode)) {
      setMode(availableModes[0] ?? "pro");
    }
  }, [availableModes, mode]);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const submitNow = () => {
    if (isLoading) {
      onStop?.();
      return;
    }

    if (input.trim() || selectedFiles.length > 0) {
      if (textareaRef.current) {
        textareaRef.current.blur();
      }

      onSubmit?.(input.trim(), selectedFiles, mode, thinkingEnabled);
      setInput("");
      setSelectedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitNow();
  };

  const handleFileSelect = (files: FileList | null, type: "image" | "pdf") => {
    if (!files) return;

    const validFiles = Array.from(files).filter((file) => {
      if (type === "image") {
        return file.type.startsWith("image/");
      } else {
        return file.type === "application/pdf";
      }
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    setShowFileOptions(false);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handlePdfUpload = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFileOptions &&
        !(event.target as Element).closest(".file-upload-container")
      ) {
        setShowFileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFileOptions]);

  return (
    <div className="relative w-full">
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files, "image")}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        multiple
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files, "pdf")}
      />

      <form onSubmit={handleSubmit} className="relative w-full">
        <div
          className="border border-slate-600 rounded-2xl p-3 sm:p-4 relative transition-all duration-300 w-full"
          style={{ backgroundColor: "#1e293b" }}
        >
          <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            {selectedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2 text-sm text-gray-300"
                  >
                    {file.type.startsWith("image/") ? (
                      <ImageIcon className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                    <span className="truncate max-w-32">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 resize-none border-none outline-none text-base sm:text-lg leading-7 sm:leading-8 min-h-[32px] max-h-40 transition-all duration-200"
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = target.scrollHeight + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitNow();
                }
              }}
            />

            <div className="flex items-center justify-between mt-4 sm:mt-6">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="relative file-upload-container">
                  <button
                    type="button"
                    onClick={() => setShowFileOptions(!showFileOptions)}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
                  >
                    <Plus className="h-5 w-5" />
                  </button>

                  {showFileOptions && (
                    <div className="absolute bottom-full mb-2 left-0 bg-slate-700 border border-slate-600 rounded-lg shadow-lg py-2 min-w-40 z-50">
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-slate-600 transition-colors flex items-center gap-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={handlePdfUpload}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-slate-600 transition-colors flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Upload PDF
                      </button>
                    </div>
                  )}
                </div>

                {showModeToggle && availableModes.length > 0 && (
                  <div className="flex items-center rounded-lg p-1 bg-slate-700 border border-slate-600">
                    {availableModes.includes("quick") && (
                      <button
                        type="button"
                        onClick={() => setMode("quick")}
                        className={`h-7 px-3 rounded-md text-xs tracking-wide font-semibold transition-all duration-200 ${
                          mode === "quick"
                            ? "bg-slate-600 text-white"
                            : "text-gray-400 hover:text-white hover:bg-slate-600"
                        }`}
                      >
                        QUICK
                      </button>
                    )}
                    {availableModes.includes("pro") && (
                      <button
                        type="button"
                        onClick={() => setMode("pro")}
                        className={`h-7 px-3 rounded-md text-xs tracking-wide font-semibold transition-all duration-200 ${
                          mode === "pro"
                            ? "bg-slate-600 text-white"
                            : "text-gray-400 hover:text-white hover:bg-slate-600"
                        }`}
                      >
                        PRO
                      </button>
                    )}
                  </div>
                )}

                {showThinkingToggle && (
                  <button
                    type="button"
                    onClick={() => setThinkingEnabled(!thinkingEnabled)}
                    className={`h-8 w-8 p-0 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                      thinkingEnabled
                        ? "bg-slate-600 text-white border border-slate-500"
                        : "text-gray-400 hover:text-white hover:bg-slate-700"
                    }`}
                    title={
                      thinkingEnabled
                        ? "Extended thinking enabled"
                        : "Enable extended thinking"
                    }
                  >
                    <Brain className="h-4 w-4" />
                  </button>
                )}
              </div>

              <button
                type={isLoading ? "button" : "submit"}
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                    onStop?.();
                  }
                }}
                disabled={!isLoading && !input.trim() && selectedFiles.length === 0}
                className={`h-8 w-8 p-0 text-white rounded-lg transition-all duration-200 hover:scale-110 disabled:hover:scale-100 flex items-center justify-center ${
                  isLoading
                    ? "bg-red-500/80 hover:bg-red-400"
                    : "bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500"
                }`}
              >
                {isLoading ? <Square className="h-4 w-4" /> : <ArrowUp className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
