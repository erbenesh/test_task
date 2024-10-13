import { fireEvent, renderHook } from "@testing-library/react";
import { describe, test, expect, vi } from 'vitest'
import { useEnterClick } from "../../src/hooks/useEnterClick";

describe("useKeydown", () => {
  test("should handle keydown event", () => {
    const callback = vi.fn();
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
    });
    const view = renderHook(() => useEnterClick(callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(0);

    vi.spyOn(document, "removeEventListener");

    view.unmount();
    
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);
    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test("shouldn`t handle unnecessary keydown event", () => {
    const callback = vi.fn();
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
    });

    renderHook(() => useEnterClick(callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});