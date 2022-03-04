(module
(table 0 anyfunc)
(memory $0 1)
(export "memory" (memory $0))
(export "GCD" (func $GCD))
(func $GCD (; 0 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
  (br_if $label$0
    (i32.lt_s
    (get_local $0)
    (i32.const 1)
    )
  )
  (br_if $label$0
    (i32.lt_s
    (get_local $1)
    (i32.const 1)
    )
  )
  (set_local $3
    (i32.const 1)
  )
  (loop $label$1
    (block $label$2
    (br_if $label$2
      (i32.rem_s
      (get_local $0)
      (get_local $3)
      )
    )
    (set_local $4
      (select
      (get_local $4)
      (get_local $3)
      (i32.rem_s
        (get_local $1)
        (get_local $3)
      )
      )
    )
    )
    (br_if $label$0
    (i32.ge_s
      (get_local $3)
      (get_local $0)
    )
    )
    (set_local $2
    (i32.lt_s
      (get_local $3)
      (get_local $1)
    )
    )
    (set_local $3
    (i32.add
      (get_local $3)
      (i32.const 1)
    )
    )
    (br_if $label$1
    (get_local $2)
    )
  )
  )
  (get_local $4)
)
)