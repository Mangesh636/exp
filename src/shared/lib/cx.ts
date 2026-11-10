import { cx as pandaCx } from "../../../styled-system/css";

type StaticClassName = string | false | null | undefined;
type DynamicClassName<State> = (state: State) => string | undefined;

/**
 * Compose Panda classes while preserving Base UI's state-aware className
 * render prop. Base UI accepts either a string or (state) => string.
 */
export function cx(...values: StaticClassName[]): string;
export function cx<State>(
  ...values: Array<StaticClassName | DynamicClassName<State>>
): (state: State) => string;
export function cx<State>(
  ...values: Array<StaticClassName | DynamicClassName<State>>
): string | ((state: State) => string) {
  if (!values.some((value) => typeof value === "function")) {
    return pandaCx(
      ...values.filter((value): value is string => typeof value === "string"),
    );
  }

  return (state: State) =>
    pandaCx(
      ...values
        .map((value) =>
          typeof value === "function" ? value(state) : value,
        )
        .filter((value): value is string => typeof value === "string"),
    );
}
