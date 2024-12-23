import time
from main import redis, Product

key = 'order-completed'
group = 'warehouse-group'

try:
    redis.xgroup_create(name=key, groupname=group,
                        mkstream=True)
    print("Group created")
except Exception as e:
    print(str(e))

while True:
    try:
        results = redis.xreadgroup(
            groupname=group,
            consumername=key,
            streams={key: '>'}

        )
        print(results)
        if results != []:
            for results in results:
                obj = results[1][0][1]
                #    print(f"Hello, {name}. You have been enrolled in {course[0]}. The course timeline is for {course[1]} months.")
                # print(f"***results1 {results[1]}")
                try:
           
                    product = Product.get(obj['product_id'])
                    product.quantity -= int(obj['quantity'])
                    product.save()
                    print(product)
                except:
                    redis.xadd(name='refund-order', fields=obj)


    except Exception as e:
        print(str(e))
    time.sleep(3)

