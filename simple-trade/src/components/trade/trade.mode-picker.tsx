import { observer } from "mobx-react-lite";
import { Modes } from "./types";

export const TradeModePicker = observer(function TradeModePicker(props: {
  mode: Modes;
  onSelect: (mode: Modes) => void;
}) {
  return (
    <div className="flex gap-4">
      <button
        className={`px-4 py-2 mt-4 self-start bg-blue-400 rounded ${
          props.mode === Modes.buy && "bg-blue-700"
        }`}
        type="button"
        onClick={() => props.onSelect(Modes.buy)}
      >
        Buy
      </button>
      {/* <button
			className={`px-4 py-2 mt-4 self-start bg-blue-400 rounded ${
			  props.mode === Modes.sell && "bg-blue-700"
			}`}
			type="button"
			onClick={() => props.onSelect(Modes.sell)}
		  >
			Sell
		  </button> */}
    </div>
  );
});
