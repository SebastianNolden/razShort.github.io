(module
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "primeToMaxnumber" (func $primeToMaxnumber))
 (func $primeToMaxnumber (; 0 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (set_local $2
   (i32.const 2)
  )
  (set_local $1
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $0)
     (i32.const 2)
    )
   )
   (set_local $1
    (i32.const 0)
   )
   (loop $label$1
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.lt_s
        (get_local $2)
        (i32.const 3)
       )
      )
      (set_local $3
       (i32.const 2)
      )
      (loop $label$4
       (br_if $label$2
        (i32.eqz
         (i32.rem_s
          (get_local $2)
          (get_local $3)
         )
        )
       )
       (br_if $label$4
        (i32.lt_s
         (tee_local $3
          (i32.add
           (get_local $3)
           (i32.const 1)
          )
         )
         (get_local $2)
        )
       )
      )
     )
     (set_local $1
      (i32.add
       (get_local $1)
       (i32.const 1)
      )
     )
    )
    (set_local $3
     (i32.eq
      (get_local $2)
      (get_local $0)
     )
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 1)
     )
    )
    (br_if $label$1
     (i32.eqz
      (get_local $3)
     )
    )
   )
  )
  (get_local $1)
 )
)
