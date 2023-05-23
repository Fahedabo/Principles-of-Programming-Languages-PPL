
; Signature: take-map(lst func pos)
; Type: (List(T) -> List(T) * T->T * Number)
; Purpose: excute the function on the list then return the first pos elements in new list
; Pre-conditions: pos >=0, lst is list
; Tests: 1-(take-map '(1 2 3) (lambda (x) (* x x)) 1) => '(1)
;;       2-(take-map '(1 2 3) (lambda (x) (* x x)) 2) => '(1 4))
;;       3-((take-map '(1 2 3) (lambda (x) (* x x)) 3) => '(1 4 9))
(define take-map
  (lambda (lst func pos)
    (if (or (empty? lst)(= pos 0))
      '()
      (if (=(length lst) pos)
        (func lst)
        (cons (func (car lst)) (take-map (cdr lst) func (- pos 1)))
      )
    )
  )
)

; ; Signature: take-filter (lst pred pos)
; ; Type: (List(T) -> List(T) * T->Boolean * Number)
; ; Purpose: excute the pred on every element in the list then return the pos elements that satisfies the pred
; ; Pre-conditions: pos >=0, lst is list
; ; Tests: 1-(take-filter '(1 2 3) (lambda (x) (> x 1)) 1) => '(2)
; ;;       2-(take-filter '(1 2 3 4 5) (lambda (x) (= (modulo x 2) 0)) 2) '(2 4)
; ;;       3-(take-filter '(1 2 3 4 5) (lambda (x) (!(= (modulo x 2) 0))) 3) '(1 3 5))
; (define take-filter
;   (lambda (lst pred pos)
;     (if (or (empty? lst) (= pos 0)))
;       '()
;       (if (pred (car lst))
;         (cons (car lst) (take-filter (cdr lst) pred (- pos 1)))
;         (take-filter (cdr lst) pred pos)
;       )
;   )
; )

; ; Signature: sub-size(lst size)
; ; Type: (List(T) -> List(T) * Number)
; ; Purpose: returns all sub-groups of the lst elements with given size
; ; Pre-conditions: size>=0, lst is list
; ; Tests: 1-(sub-size '() 0) => '(())
; ;        2-(sub-size (list 1 2 3) 3) => '((1 2 3)))
; ;        3-(sub-size (list 1 2 3) 1) => '((1) (2) (3)))
; ;        4-(sub-size (list 1 2 3) 2) => '((1 2) (2 3)))
; (define sub-size
;   (lambda (lst size)
;     (if (empty? lst))
;      '()
;      (cons (take(lst size)) (sub-size(cdr lst) size))
;   )
;  )

; ; Signature: sub-size-map(lst func size)
; ; Type: (List(T) -> List(T) * T->T *Number
; ; Purpose: excute the function on the list then returns all sub-groups of the  new lst elements with given size
; ; Pre-conditions: size>=0, lst is list
; ; Tests: 1-(sub-size-map '() (lambda (x) (+ x 1)) 0) => '(())
; ;        2-(sub-size-map (list 1 2 3) (lambda (x) (+ x 1)) 3) => '((2 3 4)) 
; ;        3-(sub-size-map (list 1 2 3) (lambda (x) (+ x 1)) 2) → '((2 3) (3 4))
; (define sub-size-map
;   (lambda (lst func size)
;     (if (empty? lst))
;       '()
;     (cons (take-map lst func size) (sub-size-map (cdr lst) func size))
;   )
;  )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define root
;   (lambda (tree)
;     (if (empty? tree)
;       '()
;       (car tree)
;     )
;   )
;  )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define left
;   (lambda (tree)
;     (if (or (empty? tree) (empty? (cdr tree)))
;       '()
;       (cdr tree)
;     )
;   )
;  )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define right
;   (lambda (tree)
;     (if (or (empty? tree) (empty? (cddr tree)))
;       '()
;       (cddr tree)
;     )
;   )
;  )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define count-node
;   (lambda (tree val)
;     (if (empty? tree)
;       0
;     if(equal? (root tree) val)
;       (+ 1 (count-node (left tree) val) (count-node (right tree) val))
;       (+ (count-node (left tree) val) (count-node (right tree) val))
;     )
;   )
;  )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define mirror-tree
;   (lambda (tree)
;     (if (empty? tree)
;       '()
;       (cons (root tree) (mirror-tree (right tree)) (mirror-tree (left tree)))))
; )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define make-ok
;   (lambda (val)
;     (cons val 'ok)
;   )
; )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define make-error
;   (lambda (msg)
;     (cons msg 'error)
;   )
; )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define ok?
;   (lambda (res)
;     (and (pair? res) (eq? (cdr res) 'ok))
;   )
; )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define error?
;   (lambda (res)
;     (and (pair? res) (eq? (cdr res) 'error))
;   )
;  )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define result?
;   (lambda (res)
;     (and (pair? res) (or (eq? (cdr res) 'okay) (eq? (cdr res) 'error)))
;   )
;  )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define result->val
;   (lambda (res)
;     (if (not(result? res))
;       'Error: not a result
;       (car res))
;   )
; )

; ; Signature:
; ; Type:
; ; Purpose:
; ; Pre-conditions:
; ; Tests:
; (define bind 
;   (lambda (f)
;     (lambda(res)
;       (if (not(result? res))
;         (make-error "Error: not a result")
;           (if (ok? res)
;             (f (result->val res))
;             (make-error (cdr res))
;           )
;       )
;     )
;   )
; )