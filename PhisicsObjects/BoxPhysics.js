import * as CANNON from 'cannon-es';

export class BoxPhysics {
    constructor(vecShape, vecPos){
        this.vecShape = vecShape;
        this.vecPos = vecPos;
        const boxPhysMat = new CANNON.Material();
        const boxBody = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(this.vecShape.x, this.vecShape.y, this.vecShape.z)),
            mass: 1,
            position: new CANNON.Vec3(this.vecPos.x, this.vecPos.y, this.vecPos.z),
            material: boxPhysMat
        });
        this.boxPhysMat = boxPhysMat
        this.boxBody = boxBody
    }

    getBody() {
        return this.boxBody
    }

    getPosition() {
        return this.boxBody.position
    }

    getQuaternion() {
        return this.boxBody.quaternion
    }

    getPhysMat() {
        return this.boxPhysMat
    }

    setVelocity(x, y, z) {
        this.boxBody.angularVelocity.set(x, y, z)
    }

    setAngularDamping(damping) {
        this.boxBody.angularDamping = damping
    }

    
}