module hello::test {
    use std::assert;
    public fun main() {
        assert!(2 + 2 == 4, 1);
    }
}