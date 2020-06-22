const { cleandir } = require("../index");

test("Should throw error when a arg is not directory.", async () => {
  await expect(cleandir("README.md")).rejects.toThrow(
    "'README.md' is not a directory."
  );
});

test("Should noop when a dir is not exists.", async () => {
  await cleandir("foobar"); // Noop
});
