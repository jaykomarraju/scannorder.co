from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app, auth
import uuid

# Initialize Flask app
app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate("firebase-adminsdk.json")
default_app = initialize_app(cred)
db = firestore.client()


# Restaurant Authentication Endpoints
@app.route('/api/auth/register', methods=['POST'])
def register():
    email = request.json['email']
    password = request.json['password']
    restaurant_name = request.json['restaurant_name']

    # Implement registration logic using Firebase Auth for email and password and Firestore DB for user data
    # Use try-except block to handle errors

    try:
        user = auth.create_user(
            email=email,
            email_verified=False,
            password=password,
            disabled=False,
        )
        # add user data to firestore
        db.collection('users').document(user.uid).set({
            'id': user.uid,
            'email': email,
            'restaurant_name': restaurant_name,
            'profile_created': 'false',
            "profile": {}
        })
        return jsonify({'message': 'Registration successful!'})
    except Exception as e:
        return (f"An Error Occurred: {e}")


@app.route('/api/auth/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    # Implement login logic using Firebase Auth for email and password
    # Use try-except block to handle errors

    try:
        # sign in with email and password
        # auth.sign_in_with_email_and_password(email, password)
        # get user data from firebase auth
        user = auth.get_user_by_email(email)
        auth.current_user = user

        # get user data from firestore
        user_data = db.collection('users').document(user.uid).get().to_dict()

        return jsonify({'message': f"Login successful for email: {email}", 'user': user_data})

    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/api/auth/logout', methods=['POST'])
def logout():

    # Implement logout logic
    # Use try-except block to handle errors

    try:
        auth.current_user = None
        return jsonify({'message': 'Logout successful!'})
    except Exception as e:
        return f"An Error Occurred: {e}"


# @app.route('/api/auth/reset-password', methods=['POST'])
# def reset_password():
#     email = request.json['email']

#     # Implement reset password logic using Firebase Auth for email and password
#     # Use try-except block to handle errors

#     try:
#         auth.send_password_reset_email(email)
#         return jsonify({'message': 'Password reset email sent!'})
#     except Exception as e:
#         return f"An Error Occurred: {e}"

# Restaurant Profile Endpoints
@app.route('/api/profile', methods=['GET', 'PUT', 'POST'])
def profile():
    if request.method == 'GET':
        profile = {}
        # TODO: Retrieve profile from Firestore DB
        user = auth.current_user
        profile = db.collection('users').document(user.uid).get().to_dict()

        return jsonify(profile)
    elif request.method == 'PUT':
        
        profile = request.json
        user = auth.get_user_by_email(profile['email'])
            # 'restaurant_address': profile['restaurant_address'],
            # 'restaurant_phone': profile['restaurant_phone'],
            # 'restaurant_website': profile['restaurant_website'],
            # 'restaurant_description': profile['restaurant_description'],
            # 'restaurant_image': profile['restaurant_image'],
            # 'restaurant_opening_hours': profile['restaurant_opening_hours'],
            # 'restaurant_closing_hours': profile['restaurant_closing_hours']

        
        # TODO: Add new profile to Firestore DB for user data
        # a profile has the following fields: restaurant_name, restaurant_address, restaurant_phone, restaurant_email, restaurant_website, restaurant_description, restaurant_image, restaurant_opening_hours, restaurant_closing_hours
        # add profile data to user data in firestore
        db.collection('users').document(user.uid).update({
            'profile_created': 'true',
            "profile": {k: v for k, v in profile.items() if k != 'email'}
        })
        


        return jsonify({'message': 'Profile added successfully!'})


# Restaurant Menu Endpoints


@app.route('/api/menu', methods=['GET', 'POST'])
def menu():
    if request.method == 'GET':
        menu_items = []
        # TODO: Retrieve menu items from Firestore DB
        return jsonify(menu_items)
    elif request.method == 'POST':
        menu_item = request.json
        menu_item['id'] = str(uuid.uuid4())
        # TODO: Add new menu item to Firestore DB
        return jsonify({'message': 'Menu item added successfully!'})


@app.route('/api/menu/<string:id>', methods=['GET', 'PUT', 'DELETE'])
def menu_item(id):
    if request.method == 'GET':
        # TODO: Retrieve menu item from Firestore DB
        return jsonify(menu_item)
    elif request.method == 'PUT':
        updated_menu_item = request.json
        # TODO: Update menu item in Firestore DB
        return jsonify({'message': 'Menu item updated successfully!'})
    elif request.method == 'DELETE':
        # TODO: Delete menu item from Firestore DB
        return jsonify({'message': 'Menu item deleted successfully!'})

# Restaurant Orders Endpoints


@app.route('/api/orders', methods=['GET', 'PUT'])
def orders():
    if request.method == 'GET':
        orders = []
        # TODO: Retrieve orders from Firestore DB
        return jsonify(orders)
    elif request.method == 'PUT':
        order_id = request.json['id']
        order_status = request.json['status']
        # TODO: Update order status in Firestore DB
        return jsonify({'message': 'Order updated successfully!'})


@app.route('/api/orders/<string:id>', methods=['GET'])
def order(id):
    # TODO: Retrieve order from Firestore DB
    return jsonify(order)

# Restaurant Payment Endpoints


@app.route('/api/payment', methods=['GET'])
def payments():
    payments = []
    # TODO: Retrieve payments from Firestore DB
    return jsonify(payments)


@app.route('/api/payment/<string:id>', methods=['GET'])
def payment(id):
    # TODO: Retrieve payment from Firestore DB
    return jsonify(payment)

# Restaurant Coupon Endpoints


@app.route('/api/coupon', methods=['GET', 'POST'])
def coupons():
    if request.method == 'GET':
        coupons = []
        # TODO: Retrieve coupons from Firestore DB
        return jsonify(coupons)
    elif request.method == 'POST':
        coupon = request.json
        coupon['id'] = str(uuid.uuid4())
        # TODO: Add new coupon to Firestore DB
        return jsonify({'message': 'Coupon added successfully!'})


@app.route('/api/coupon/<string:id>', methods=['PUT', 'DELETE'])
def coupon(id):
    if request.method == 'PUT':
        updated_coupon = request.json
        # TODO: Update coupon in Firestore DB
        return jsonify({'message': 'Coupon updated successfully!'})
    elif request.method == 'DELETE':
        # TODO: Delete coupon from Firestore DB
        return jsonify({'message': 'Coupon deleted successfully!'})
    


if __name__ == '__main__':
    app.run(debug=True)

