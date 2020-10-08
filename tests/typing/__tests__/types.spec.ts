import { AssertTrue, AssertFalse, Has, IsExact, assert } from "conditional-type-checks";

// $ExpectType Pick<{ a: "1"; b: "2"; c: "3"; }, "c">
type Test_01_Omit = Omit<{ a: '1'; b: '2'; c: '3' }, 'a' | 'b'>;

type Test_02_Omit =
  | AssertTrue<IsExact<Test_01_Omit, { c: '3' }>>
  | AssertFalse<Has<Test_01_Omit, { a: '1'; b: '2' }>>;

  assert<IsExact<Test_01_Omit, { c: '3' }>>(true)
